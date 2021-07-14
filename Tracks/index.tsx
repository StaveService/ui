import React, { useState, MouseEvent } from 'react';
import { FaGuitar } from 'react-icons/fa';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import Paper from '@material-ui/core/Paper';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { model } from '@coderline/alphatab';

const GuitarIcon = ({ color }: SvgIconProps) => (
  <SvgIcon color={color}>
    <FaGuitar />
  </SvgIcon>
);
export const Track = new model.Track();
interface TracksProps {
  tracks?: typeof Track[];
  selectedIndex?: number;
  onListItemClick?: (track: typeof Track, index: number) => void;
  onSolo?: (solo: boolean, soloTracks: typeof Track) => void;
  onMute?: (mute: boolean, mutedTracks: typeof Track) => void;
}
const Tracks: React.FC<TracksProps> = ({
  tracks,
  selectedIndex,
  onListItemClick,
  onSolo,
  onMute,
}: TracksProps) => {
  const trackItems = tracks?.map((track, i) => {
    const [mute, setMute] = useState(false);
    const [solo, setSolo] = useState(false);
    const selected = selectedIndex === i;
    // handlers
    const handleListItemClick = () => {
      if (onListItemClick) onListItemClick(track, i);
    };
    const handleMute = (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (onMute) onMute(mute, track);
      setMute(!mute);
    };
    const handleSolo = (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (onSolo) onSolo(solo, track);
      setSolo(!solo);
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
        <ListItemText
          primary={track.name}
          secondary={
            <ToggleButtonGroup>
              <ToggleButton size="small" selected={mute} onClick={handleMute}>
                M
              </ToggleButton>
              <ToggleButton size="small" selected={solo} onClick={handleSolo}>
                S
              </ToggleButton>
            </ToggleButtonGroup>
          }
        />
      </ListItem>
    );
  });
  return (
    <List className="at-track-list" component={Paper}>
      {trackItems}
    </List>
  );
};
Tracks.defaultProps = {
  tracks: [],
  selectedIndex: 0,
  onMute: undefined,
  onSolo: undefined,
  onListItemClick: undefined,
};
export default Tracks;
