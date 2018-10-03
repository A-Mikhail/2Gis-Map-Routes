import React, { Component } from 'react';
import './style.scss';
import { Notification } from '../Controllers/Notification';

const DG = require('2gis-maps');

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      containerID: '',
      featuresArray: [], // set of all features
      coordinates: [],
      shapeType: [],
    };

    // make 'this' work in the callback
    this.exportMap = this.exportMap.bind(this);
  }

  componentWillMount() {
    this.setState({
      containerID: 'default',
    });
  }

  componentDidMount() {
    this.setState({
      containerID: this.props.name,
    });

    const createdMap = DG.map(this.state.containerID, {
      center: [this.props.lat, this.props.long],
      zoom: this.props.zoom,
      minZoom: this.props.minZoom,
      maxZoom: this.props.maxZoom,
    });

    this.mapControl(createdMap);
    this.mapDraw(createdMap);
    this.mapConvert(createdMap);

    if (this.props.mapPath) {
      this.importMap(createdMap);
    }
  }

  mapControl(map) {
    if (this.props.admin) {
      // define toolbar options
      const options = {
        position: 'topleft', // toolbar position, options are 'topleft', 'topright', 'bottomleft', 'bottomright'
        drawMarker: true, // adds button to draw markers
        drawPolyline: true, // adds button to draw a polyline
        drawRectangle: true, // adds button to draw a rectangle
        drawPolygon: true, // adds button to draw a polygon
        drawCircle: true, // adds button to draw a cricle
        cutPolygon: true, // adds button to cut a hole in a polygon
        editMode: true, // adds button to toggle edit mode for all layers
        removalMode: true, // adds a button to remove layers
      };

      // add leaflet.pm controls to the map
      map.pm.addControls(options);
    }
  }

  mapDraw(map) {
    const that = this;

    // listen to drawing mode gets enabled
    map.on('pm:drawstart', (e) => {
      const layer = e.workingLayer;

      // Listen new added vertex (Line & Poly only)
      layer.on('pm:vertexadded', (e) => {
        that.setState(previousState => ({
          shapeType: [...previousState.shapeType, e.shape],
        }));

        const lastUsedShape = that.state.shapeType[that.state.shapeType.length - 1];

        if (e.shape && lastUsedShape === 'Line') {
          const newCoordinates = [e.latlng.lng, e.latlng.lat];

          that.setState(previousState => ({
            shapeType: e.shape,
            coordinates: [...previousState.coordinates, newCoordinates],
          }));
        } else if (e.shape && lastUsedShape === 'Poly') {
          const newCoordinates = [e.latlng.lng, e.latlng.lat];

          that.setState(previousState => ({
            shapeType: e.shape,
            coordinates: [...previousState.coordinates, newCoordinates],
          }));
        }
      });

      layer.pm.hasSelfIntersection();
    });

    // listen to when a new layer is created
    map.on('pm:create', (e) => {
      if (e.shape === 'Marker') {
        const newCoordinates = [e.layer._latlng.lng, e.layer._latlng.lat];

        const geoJsonFeature = {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: newCoordinates,
          },
        };

        that.setState(previousState => ({
          featuresArray: [...previousState.featuresArray, geoJsonFeature],
          coordinates: [], // clear coordinates after writing to the featuresArray
        }));
      }
    });
  }

  mapConvert(map) {
    const that = this;

    // Convert leaflet.pm data to geoJson
    map.on('pm:drawend', (e) => {
      if (e.shape === 'Line') {
        // Make LineString out of Line's shape coordinates
        const geoJsonFeature = {
          type: 'Feature',
          properties: null,
          geometry: {
            type: 'LineString',
            coordinates: that.state.coordinates,
          },
        };

        that.setState(previousState => ({
          featuresArray: [...previousState.featuresArray, geoJsonFeature],
          coordinates: [], // clear coordinates after writing to the featuresArray
        }));
      } else if (e.shape === 'Poly') {
        // Take the last coordinate of the Polygon
        // and push it to the first element of the array
        const lastCoordinate = that.state.coordinates[that.state.coordinates.length - 1];
        that.state.coordinates.unshift(lastCoordinate);

        // Make Polygon out of Poly shapes
        const geoJsonFeature = {
          type: 'Feature',
          properties: null,
          geometry: {
            type: 'Polygon',
            coordinates: [that.state.coordinates],
          },
        };

        that.setState(previousState => ({
          featuresArray: [...previousState.featuresArray, geoJsonFeature],
          coordinates: [], // clear coordinates after writing to the featuresArray
        }));
      }
    });
  }

  exportMap() {
    // Write all the features user has created
    // into the .json file and start to download it
    const exportObj = {
      type: 'FeatureCollection',
      features: this.state.featuresArray,
    };

    const dataStr = `data:text/json;charset=utf-8, ${encodeURIComponent(JSON.stringify(exportObj))}`;
    const downloadAnchorNode = document.createElement('a');

    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', 'exportMap.json');

    document.body.appendChild(downloadAnchorNode);

    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  // Import map used assigned path from the <Map /> props
  // to immediately display it on the map
  // as only its found the geoJson file
  importMap(map) {
    const obj = new XMLHttpRequest();
    obj.overrideMimeType('application/json');
    obj.open('GET', this.props.mapPath, true);

    obj.onreadystatechange = () => {
      const parsedRoute = JSON.parse(obj.responseText);

      DG.geoJson(parsedRoute).addTo(map);
    };

    obj.send(null);
  }

  render() {
    // Admin mode
    if (this.props.admin) {
      const expMapButton = <button type="button" onClick={this.exportMap} className="button is-primary"> Сохранить карту </button>;

      return (
        <>
          <p> Импортировать Карту </p>

          {expMapButton}

          <div id={this.state.containerID} className={this.props.className} />
        </>
      );
    }

    // Default user mode
    return (
      <>
        <div id={this.state.containerID} className={this.props.className} />
      </>
    );
  }
}
