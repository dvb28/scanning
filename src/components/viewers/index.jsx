import React from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

export default function Viewers({ ...props }) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <Viewer
      {...props}
      httpHeaders={{
        Authorization: 'Bearer xxxxxx',
        AccessControlAllowOrigin: '*',
      }}
      plugins={[
        // Register plugins
        defaultLayoutPluginInstance,
      ]}
      withCredentials={true}
    />
  );
}
