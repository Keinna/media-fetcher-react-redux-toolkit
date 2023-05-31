import { useFetchAlbumsQuery } from "../store";
import SkeletonLoader from "./SkeletonLoader";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";

function AlbumsList({ user }) {
    //got user in the hook  from api endpoint
    const { data, error, isLoading } = useFetchAlbumsQuery(user);

    let content;
    if (isLoading) {
        <SkeletonLoader times={3} />;
    } else if (error) {
        content = <div>Error loading albums</div>;
    } else {
        content = data.map((album) => {
            const header = <div>{album.title}</div>;
            return (
                <ExpandablePanel key={album.id} header={header}>
                    List of photos in album
                </ExpandablePanel>
            );
        });
    }

    return (
        <div>
            <div>Albums for {user.name}</div>
            <div>{content}</div>
        </div>
    );
}

export default AlbumsList;
