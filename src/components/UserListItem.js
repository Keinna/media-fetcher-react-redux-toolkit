import { GoTrashcan } from "react-icons/go";
import Button from "./Button";
import { removeUser } from "../store";
//for showing loading spinner
import { useThunk } from "../hooks/use-thunk";
import ExpandablePanel from "./ExpandablePanel";

function UserListItem({ user }) {
    const [doRemoveUser, isLoading, error] = useThunk(removeUser);

    const handleClick = () => {
        doRemoveUser(user);
    };

    const header = (
        <>
            <Button className="mr-3" loading={isLoading} onClick={handleClick}>
                <GoTrashcan className="bg-red" />
            </Button>
            {error && <div>"Error deleting user"</div>}
            {user.name}
        </>
    );

    return <ExpandablePanel header={header}>Content!!</ExpandablePanel>;
}

export default UserListItem;
