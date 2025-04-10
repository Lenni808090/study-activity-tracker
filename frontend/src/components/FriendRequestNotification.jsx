import { useEffect } from "react";
import { useFriendStore } from "../store/useFriendStore";
import { UserCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function FriendRequestNotification() {
  const { friendRequests, getFriendRequests } = useFriendStore();

  useEffect(() => {
    getFriendRequests();
    
    // Poll for new friend requests every minute
    const interval = setInterval(() => {
      getFriendRequests();
    }, 60000);
    
    return () => clearInterval(interval);
  }, [getFriendRequests]);

  if (!friendRequests.length) return null;

  return (
    <Link to="/friends" className="indicator">
      <span className="indicator-item badge badge-primary">{friendRequests.length}</span>
      <button className="btn btn-ghost btn-circle">
        <UserCheck size={20} />
      </button>
    </Link>
  );
}