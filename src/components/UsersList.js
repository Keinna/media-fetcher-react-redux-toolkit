import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers, addUser, removeUser } from "../store";
import Button from "./Button";
import SkeletonLoader from "./SkeletonLoader";
import { useThunk } from "../hooks/use-thunk";
import UserListItem from "./UserListItem";

function UsersList() {
    //keep track loading big list of users
    const [doFetchUsers, isLoadingUsers, loadingUsersError] =
        useThunk(fetchUsers);
    const [doCreateUser, isCreatingUser, creatingUsersError] =
        useThunk(addUser);

    const { data } = useSelector((state) => {
        return state.users;
    });

    useEffect(() => {
        doFetchUsers();
    }, [doFetchUsers]);

    const handleUserAdd = () => {
        doCreateUser();
    };

    let content;
    if (isLoadingUsers) {
        content = <SkeletonLoader times={6} className="h-10 w-full" />;
    } else if (loadingUsersError) {
        content = <div>Error fetching data....</div>;
    } else {
        content = data.map((user) => {
            return <UserListItem key={user.id} user={user} />;
        });
    }

    return (
        <div>
            <div className="flex flex-row justify-between items-center m-3">
                <h1 className="m-2 text-xl">Users </h1>
                <Button
                    loading={isCreatingUser}
                    onClick={handleUserAdd}
                    primary
                >
                    + Add User
                </Button>
                {creatingUsersError &&
                    "Error creating user..." + creatingUsersError.err}
            </div>
            {content}
        </div>
    );
}

export default UsersList;
