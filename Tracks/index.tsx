import React, { useState, MouseEvent } from "react";
import { FaGuitar } from "react-icons/fa";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";
import Paper from "@material-ui/core/Paper";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

const GuitarIcon = ({ color }: SvgIconProps) => (
  <SvgIcon color={color}>
    <FaGuitar />
  </SvgIcon>
);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export interface ITrack {
  name: string;
  index: string;
}
interface TrackProps extends Omit<TracksProps, "tracks"> {
  track: ITrack;
  i: number;
}
const Track: React.FC<TrackProps> = ({
  track,
  selectedIndex,
  i,
  onListItemClick,
  onMute,
  onSolo,
}: TrackProps) => {
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
        <GuitarIcon color={selected ? "primary" : "inherit"} />
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
};
interface TracksProps {
  tracks?: ITrack[];
  selectedIndex?: number;
  onListItemClick?: (track: ITrack, index: number) => void;
  onSolo?: (solo: boolean, soloTracks: ITrack) => void;
  onMute?: (mute: boolean, mutedTracks: ITrack) => void;
}
const Tracks: React.FC<TracksProps> = ({
  tracks,
  selectedIndex,
  onListItemClick,
  onSolo,
  onMute,
}: TracksProps) => (
  <>
    {tracks?.map((track, i) => (
      <List key={track.index} className="at-track-list" component={Paper}>
        <Track
          track={track}
          selectedIndex={selectedIndex}
          i={i}
          onListItemClick={onListItemClick}
          onSolo={onSolo}
          onMute={onMute}
        />
      </List>
    ))}
  </>
);
Tracks.defaultProps = {
  tracks: [],
  selectedIndex: 0,
  onMute: undefined,
  onSolo: undefined,
  onListItemClick: undefined,
};
export default Tracks;
