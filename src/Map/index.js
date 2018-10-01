import React, { Component } from 'react';
import './style.scss';
import { Notification } from '../Controllers/Notification';

const DG = require('2gis-maps');

class Map extends Component {
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

    if (this.props.admin) {
      let that = this;

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
      createdMap.pm.addControls(options);

      // listen to drawing mode gets enabled
      createdMap.on('pm:drawstart', (e) => {
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
      createdMap.on('pm:create', (e) => {
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

      // Convert leaflet.pm data to geoJson
      createdMap.on('pm:drawend', (e) => {
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

    this.importMap(createdMap);
  }

  // get information from the file
  importMap(map) {
    const onChange = (event) => {
      const reader = new FileReader();
      reader.onload = onReaderLoad;
      reader.readAsText(event.target.files[0]);
    };

    const onReaderLoad = event => {
      const obj = JSON.parse(event.target.result);

      // Add our geoJson data to the map
      let polygonLayer = DG.geoJson(obj).addTo(map);
    };

    document.getElementById('file').addEventListener('change', onChange);
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

  render() {
    let expMapButton;
    const impMapButton = <input id="file" type="file" />;

    if (this.props.admin) {
      expMapButton = <button type="button" onClick={this.exportMap} className="button is-primary"> Сохранить карту </button>;

      return (
        <>
          <p> Импортировать Карту </p>

          {impMapButton}
          {expMapButton}

          <div id={this.state.containerID} className={this.props.className} />
        </>
      );
    }

    return (
      <>
        {impMapButton}

        <div id={this.state.containerID} className={this.props.className} />
      </>
    );
  }
}

export default Map;
