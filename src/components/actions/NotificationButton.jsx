import { IconButton } from "../ui/IconButton.jsx";
import { AssetIcon } from "../ui/AssetIcon.jsx";

export function NotificationButton(props) {
  return <IconButton label="Notifications" {...props}><AssetIcon icon="bell" className="joker-action-icon" /></IconButton>;
}
