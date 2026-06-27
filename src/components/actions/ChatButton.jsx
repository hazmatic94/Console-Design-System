import { IconButton } from "../ui/IconButton.jsx";
import { AssetIcon } from "../ui/AssetIcon.jsx";

export function ChatButton(props) {
  return <IconButton label="Messages" {...props}><AssetIcon icon="messages" className="joker-action-icon" /></IconButton>;
}
