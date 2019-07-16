import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

export default class PhotoUpload extends React.Component {

  render() {
    return (
    <Dropzone
      multiple={false}
      accept="image/*"
      onDrop={this.onImageDrop.bind(this)}>
      <p>Drop an image or click to select a file to upload.</p>
    </Dropzone>
    )
  }
  
}
