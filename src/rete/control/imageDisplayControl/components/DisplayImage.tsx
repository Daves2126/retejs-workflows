import { ImageDisplayControl } from "../ImageDisplayControl";

export function CustomImage(props: { data: ImageDisplayControl }) {
  console.log("inside CustomImage", props.data);
  return <img src={props.data.imageUrl} alt="Dog" style={{ width: '100%', height: 'auto' }} />;
}
