import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";

export function FamilyMemberItemImage({ imagePath }: { imagePath: string }) {
  // Create and configure your Cloudinary instance.
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dutizqtbe",
    },
  });

  const myImage = cld.image(imagePath);

  myImage.resize(thumbnail().width(150)).format("png");

  return <AdvancedImage cldImg={myImage} />;
}
