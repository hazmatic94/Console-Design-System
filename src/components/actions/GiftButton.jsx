import { IconButton } from "../ui/IconButton.jsx";
import { AssetIcon } from "../ui/AssetIcon.jsx";

export function GiftButton(props) {
  return <IconButton label="Promotions" {...props}><AssetIcon icon="promotions" className="joker-action-icon" /></IconButton>;
}
