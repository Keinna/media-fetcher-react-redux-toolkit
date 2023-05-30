import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import Button from "./Button";
import SkeletonLoader from "./SkeletonLoader";

function UsersList() {
    //keep track loading big list of users
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);
    const [loadingUsersError, setIsLoadingUsersError] = useState(null);
    const [isCreatingUser, setIsCreatingUser] = useState(false);
    const [creatingUsersError, setCreatingUsersError] = useState(null);
    const dispatch = useDispatch();
    const { data } = useSelector((state) => {
        return state.users;
    });

    useEffect(() => {
        setIsLoadingUsers(true);
        //returns promise, always goes into .then also when fails -> unwrap()
        dispatch(fetchUsers())
            //returns new promise where conventional rules are followed
            .unwrap()
            // .then(() =>{

            // })
            .catch((err) => {
                //gives error object
                setIsLoadingUsersError(err);
            })
            .finally(() => {
                setIsLoadingUsers(false);
                setIsLoadingUsers(false);
            });
    }, [dispatch]);

    const handleUserAdd = () => {
        setIsCreatingUser(true);
        dispatch(addUser())
            .unwrap()
            .catch((err) => setCreatingUsersError(err))
            .finally(() => setIsCreatingUser(false));
    };

    if (isLoadingUsers) {
        return <SkeletonLoader times={6} className="h-10 w-full" />;
    }
    if (loadingUsersError) {
        return <div>Error fetching data....</div>;
    }

    const renderedUsers = data.map((user) => {
        return (
            <div key={user.id} className="mb-2 border rounded">
                <div className="flex p-2 justify-between items-center cursor-pointer">
                    {user.name}
                </div>
            </div>
        );
    });

    return (
        <div>
            <div className="flex flex-row justify-between m-3">
                <h1 className="m-2 text-xl">Users </h1>
                {isCreatingUser ? (
                    "Creating User"
                ) : (
                    <Button onClick={handleUserAdd}>+ Add User</Button>
                )}
                {creatingUsersError &&
                    "Error creating user..." + creatingUsersError.err}
            </div>
            {renderedUsers}
        </div>
    );
}

export default UsersList;
