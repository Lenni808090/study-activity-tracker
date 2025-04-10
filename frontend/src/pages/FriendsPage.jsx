import { useEffect, useState } from "react";
import { useFriendStore } from "../store/useFriendStore";
import { UserPlus, UserCheck, UserX, Users } from "lucide-react";

export default function FriendsPage() {
  const {
    friendRequests,
    sentRequests,
    addableUsers,
    friends,
    getFriendRequests,
    getSentRequests,
    getAddableUsers,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    getFriends
  } = useFriendStore();

  const [activeTab, setActiveTab] = useState("friends");

  useEffect(() => {
    getFriendRequests();
    getSentRequests();
    getAddableUsers();
    getFriends();
  }, [getFriendRequests, getSentRequests, getAddableUsers, getFriends]);

  return (
    <div className="container mx-auto p-4 max-w-4xl animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Friends</h1>
      
      <div className="tabs tabs-boxed mb-6">
        <button 
          className={`tab ${activeTab === 'friends' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('friends')}
        >
          <Users className="mr-2" size={18} />
          My Friends
        </button>
        <button 
          className={`tab ${activeTab === 'requests' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('requests')}
        >
          <UserCheck className="mr-2" size={18} />
          Friend Requests
        </button>
        <button 
          className={`tab ${activeTab === 'sent' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('sent')}
        >
          <UserPlus className="mr-2" size={18} />
          Sent Requests
        </button>
        <button 
          className={`tab ${activeTab === 'add' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('add')}
        >
          <UserPlus className="mr-2" size={18} />
          Add Friends
        </button>
      </div>

      {activeTab === 'friends' && (
        <div className="animate-slide-down">
          <h2 className="text-xl font-semibold mb-4">My Friends</h2>
          {friends.length === 0 ? (
            <p className="text-gray-500">You don't have any friends yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {friends.map((friend) => (
                <div key={friend._id} className="card bg-base-200 shadow-md">
                  <div className="card-body">
                    <h3 className="card-title">{friend.fullName}</h3>
                    <p>{friend.email}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'requests' && (
        <div className="animate-slide-down">
          <h2 className="text-xl font-semibold mb-4">Friend Requests</h2>
          {friendRequests.length === 0 ? (
            <p className="text-gray-500">You don't have any friend requests.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {friendRequests.map((request) => (
                <div key={request._id} className="card bg-base-200 shadow-md">
                  <div className="card-body">
                    <h3 className="card-title">{request.sender.fullName}</h3>
                    <p>{request.sender.email}</p>
                    <div className="card-actions justify-end mt-2">
                      <button 
                        className="btn btn-sm btn-success"
                        onClick={() => acceptFriendRequest(request._id)}
                      >
                        <UserCheck size={16} />
                        Accept
                      </button>
                      <button 
                        className="btn btn-sm btn-error"
                        onClick={() => rejectFriendRequest(request._id)}
                      >
                        <UserX size={16} />
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'sent' && (
        <div className="animate-slide-down">
          <h2 className="text-xl font-semibold mb-4">Sent Requests</h2>
          {sentRequests.length === 0 ? (
            <p className="text-gray-500">You haven't sent any friend requests.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sentRequests.map((request) => (
                <div key={request._id} className="card bg-base-200 shadow-md">
                  <div className="card-body">
                    <h3 className="card-title">{request.receiverId.fullName}</h3>
                    <p>{request.receiverId.email}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Status: {request.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'add' && (
        <div className="animate-slide-down">
          <h2 className="text-xl font-semibold mb-4">Add Friends</h2>
          {addableUsers.length === 0 ? (
            <p className="text-gray-500">No users available to add as friends.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addableUsers.map((user) => (
                <div key={user._id} className="card bg-base-200 shadow-md">
                  <div className="card-body">
                    <h3 className="card-title">{user.fullName}</h3>
                    <p>{user.email}</p>
                    <div className="card-actions justify-end mt-2">
                      <button 
                        className="btn btn-sm btn-primary"
                        onClick={() => sendFriendRequest(user._id)}
                      >
                        <UserPlus size={16} />
                        Send Request
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}