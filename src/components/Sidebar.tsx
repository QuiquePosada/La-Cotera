import React, { useState, useEffect } from 'react';
import { List, ListItem, Note } from '@contentful/forma-36-react-components';
import { SidebarExtensionSDK } from '@contentful/app-sdk';
import readingTime from 'reading-time';

interface SidebarProps {
  sdk: SidebarExtensionSDK;
}

const CONTENT_FIELD_ID = 'body';

const Sidebar = (props: SidebarProps) => {
  const { sdk } = props;

  const contentField = sdk.entry.fields[CONTENT_FIELD_ID];

  const [blogText, setBlogText] = useState(contentField.getValue());

  // Listen for onChange events and update the value
  useEffect(() => {
    const detach = contentField.onValueChanged((value) => {
      setBlogText(value);
    });
    return () => detach();
  }, [contentField]);

  // Calculate the metrics based on the new value
  const stats = readingTime(blogText || '');

  // Render the metrics with Forma36 components
  return (
    <>
      <Note style={{ marginBottom: '12px' }}>
        Metricas de Lectura en Info de la Vaca :
        <List style={{ marginTop: '12px' }}>
          <ListItem>Conteo de Palabras : {stats.words}</ListItem>
          <ListItem>Tiempo de Lectura : {stats.text}</ListItem>
        </List>
      </Note>
    </>
  );
};

export default Sidebar;
