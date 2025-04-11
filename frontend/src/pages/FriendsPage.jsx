import { useEffect, useState } from "react";
import { useFriendStore } from "../store/useFriendStore";
import { UserPlus, UserCheck, UserX, Users, Search } from "lucide-react";

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
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getFriendRequests();
    getSentRequests();
    getAddableUsers();
    getFriends();
  }, [getFriendRequests, getSentRequests, getAddableUsers, getFriends]);

  const filteredUsers = (users) => {
    return users.filter(user => 
      user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl animate-fade-in">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Friends & Connections
      </h1>
      
      <div className="tabs tabs-boxed mb-6 p-2 gap-2">
        <button 
          className={`tab gap-2 transition-all duration-300 transform hover:scale-105
            ${activeTab === 'friends' ? 'tab-active scale-105' : ''}`}
          onClick={() => setActiveTab('friends')}
        >
          <Users className="mr-2" size={18} />
          My Friends
        </button>
        <button 
          className={`tab gap-2 transition-all duration-300 transform hover:scale-105
            ${activeTab === 'requests' ? 'tab-active scale-105' : ''}`}
          onClick={() => setActiveTab('requests')}
        >
          <UserCheck className="mr-2" size={18} />
          Friend Requests
          {friendRequests.length > 0 && (
            <span className="badge badge-primary badge-sm">{friendRequests.length}</span>
          )}
        </button>
        <button 
          className={`tab gap-2 transition-all duration-300 transform hover:scale-105
            ${activeTab === 'sent' ? 'tab-active scale-105' : ''}`}
          onClick={() => setActiveTab('sent')}
        >
          <UserPlus className="mr-2" size={18} />
          Sent Requests
        </button>
        <button 
          className={`tab gap-2 transition-all duration-300 transform hover:scale-105
            ${activeTab === 'add' ? 'tab-active scale-105' : ''}`}
          onClick={() => setActiveTab('add')}
        >
          <UserPlus className="mr-2" size={18} />
          Add Friends
        </button>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search by name or email..."
          className="input input-bordered w-full pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="transition-all duration-300 ease-in-out">
        {activeTab === 'friends' && (
          <div className="animate-slide-down">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Users className="text-primary" />
              My Friends
            </h2>
            {filteredUsers(friends).length === 0 ? (
              <div className="text-center p-8 bg-base-200 rounded-lg shadow-inner animate-pulse">
                <p className="text-gray-500">
                  {friends.length === 0
                    ? "You don't have any friends yet."
                    : `No friends found matching '${searchTerm}'`
                  }
                </p>
                <button 
                  className="btn btn-primary btn-sm mt-4"
                  onClick={() => setActiveTab('add')}
                  style={{ display: friends.length === 0 ? 'inline-flex' : 'none' }}
                >
                  Find Friends
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredUsers(friends).map((friend) => (
                  <div 
                    key={friend._id} 
                    className="card bg-base-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="card-body">
                      <div className="flex items-center gap-4">
                        <div>
                          <h3 className="card-title">{friend.fullName}</h3>
                          <p className="text-sm opacity-70">{friend.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Similar pattern for other tabs... */}
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
                      <h3 className="card-title">{request.senderId?.fullName}</h3>
                      <p>{request.senderId?.email}</p>
                      <div className="card-actions justify-end mt-2">
                        <button 
                          className="btn btn-sm btn-success"
                          onClick={() => {
                            acceptFriendRequest(request.senderId._id)  // Changed from request._id to request.senderId._id
                              .then(() => {
                                // Refresh all relevant data after accepting
                                getFriendRequests();
                                getFriends();
                                getAddableUsers();
                              });
                          }}
                        >
                          <UserCheck size={16} />
                          Accept
                        </button>
                        <button 
                          className="btn btn-sm btn-error"
                          onClick={() => {
                            rejectFriendRequest(request._id)
                              .then(() => {
                                // Refresh requests after rejecting
                                getFriendRequests();
                                getAddableUsers();
                              });
                          }}
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
    </div>
  );
}
