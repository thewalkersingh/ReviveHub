import {ImageList, ImageListItem, Typography} from '@mui/material';
import PropTypes from "prop-types";

const VehicleImageGallery = ({images}) => {
  if (!images || images.length === 0) {
    return <Typography>No images available.</Typography>;
  }
  
  return (
    <ImageList variant="woven" cols={3} gap={8}>
      {images.map((imgUrl, index) => (
        <ImageListItem key={index}>
          <img src={imgUrl} alt={`Vehicle image ${index + 1}`} loading="lazy"/>
        </ImageListItem>
      ))}
    </ImageList>
  );
};
VehicleImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default VehicleImageGallery;
