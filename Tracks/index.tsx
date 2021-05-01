import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import { FaGuitar } from 'react-icons/fa';
import Paper from '@material-ui/core/Paper';

const GuitarIcon = ({ color }: SvgIconProps) => {
  return (
    <SvgIcon color={color}>
      <FaGuitar />
    </SvgIcon>
  );
};
export interface Track {
  name: string;
  selectedIndex: number;
}
interface TracksProps {
  tracks?: Track[];
  selectedIndex?: number;
  onListItemClick?: (track: Track, index: number) => void;
}
const Tracks: React.FC<TracksProps> = ({
  tracks,
  selectedIndex,
  onListItemClick,
}: TracksProps) => {
  const trackItems = tracks?.map((track, i) => {
    const selected = selectedIndex === i;
    const handleListItemClick = () => {
      if (onListItemClick) onListItemClick(track, i);
    };
    return (
      <ListItem
        key={track.name}
        id="at-track-template"
        button
        selected={selected}
        onClick={handleListItemClick}
      >
        <ListItemIcon>
          <GuitarIcon color={selected ? 'primary' : 'inherit'} />
        </ListItemIcon>
        <ListItemText primary={track.name} />
      </ListItem>
    );
  });
  return <List className="at-track-list" component={Paper}>{trackItems}</List>;
};
Tracks.defaultProps = {
  tracks: [],
  selectedIndex: 0,
  onListItemClick: undefined,
};
export default Tracks;
