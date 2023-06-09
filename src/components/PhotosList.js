import { useFetchPhotosQuery, useAddPhotoMutation } from "../store";
import Button from "./Button";
import SkeletonLoader from "./SkeletonLoader";
import PhotosListItem from "./PhotosListItem";

function PhotosList({ album }) {
    const { data, isFetching, error } = useFetchPhotosQuery(album);

    const [addPhoto, addPhotoResults] = useAddPhotoMutation();
    const handleAddPhoto = () => {
        addPhoto(album);
    };

    let content;

    if (isFetching) {
        content = <SkeletonLoader className="h-8 w-8" times={4} />;
    } else if (error) {
        content = <div>Error fetching photo's...</div>;
    } else {
        content = data.map((photo) => {
            return <PhotosListItem key={photo.id} photo={photo} />;
        });
    }

    return (
        <div>
            <div className="m-2 flex flew-row items-center justify-between">
                <h3 className="text-lg font-bold">Photos in {album.title}</h3>
                <Button
                    loading={addPhotoResults.isLoading}
                    onClick={handleAddPhoto}
                    primary
                >
                    + Add Photo
                </Button>
            </div>
            <div className="mx-8 flex flex-row flex-wrap justify-center">
                {content}
            </div>
        </div>
    );
}

export default PhotosList;
