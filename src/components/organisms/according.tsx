import * as React from 'react';
import { List } from 'react-native-paper';
import DSPTableScoreCard from './Tables';

const Accordions = () => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Section title="Accordions">
      <List.Accordion
        title="Uncontrolled Accordion"
        left={props => <List.Icon {...props} icon="folder" />}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>

      {/* <List.Accordion
        title="Controlled Accordion"
        left={props => <List.Icon {...props} icon="folder" />}
        expanded={expanded}
        onPress={handlePress}>
      </List.Accordion> */}
      {/* <DSPTableScoreCard/> */}
    </List.Section>
  );
};

export default Accordions;