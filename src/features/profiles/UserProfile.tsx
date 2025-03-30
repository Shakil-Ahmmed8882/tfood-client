import { Crown, Edit, Mail, MapPin, Phone, User } from "lucide-react";
import dummyAvater from "../../assets/dummyAvater.png";
import { useNavigate } from "react-router-dom";
import { Container } from "@/components/wrapper/Container";
import { useGetUserQuery } from "@/store/features/user/userApi";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

// Reusable ProfileItem component
const ProfileItem = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
  <div className="flex items-center gap-4">
    <Icon className="w-5 h-5 text-gray-500" />
    <span>{text}</span>
  </div>
);

export default function UserProfile() {
  const {
    data: userData,
    isLoading,
  } = useGetUserQuery(undefined);

  const navigate = useNavigate();

  const user = userData?.data;

if(isLoading || !user) return <LoadingSpinner/>
  return (
    <Container className="min-h-screen mt-20">
      <div className="flex flex-col md:flex-row gap-6 w-full">
        {/* Left Profile Section */}
        <div className="bg-white rounded-lg p-6 flex flex-col items-center shadow-sm">
          <div className="relative w-32 h-32">
            <img
              src={dummyAvater}
              alt="Profile picture"
              width={128}
              height={128}
              className="rounded-full object-cover"
            />
          </div>
          <h2 className="text-xl font-semibold mt-4 mb-6">{user?.name}</h2>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4" />
              <span className="text-sm">Rank {user?.rank || 0}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center text-xs">
                $
              </div>
              <span className="text-sm">{user?.points || 0} PTS</span>
            </div>
          </div>
        </div>

        {/* Right Details Section */}
        <div className="bg-white rounded-lg p-6 flex-1 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">User Profile</h2>
            <button
              onClick={() => navigate("/edit-profile/customId")}
              className="flex items-center gap-1 px-3 py-1.5 text-sm border rounded-md hover:bg-gray-50 transition-colors"
            >
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </button>
          </div>

          <div className="space-y-4">
            <ProfileItem icon={User} text={user?.name} />
            <ProfileItem icon={Mail} text={user?.email} />
            <ProfileItem icon={Phone} text={user?.phone || "N/A"} />
            <ProfileItem icon={MapPin} text={user?.location || "N/A"} />
          </div>
        </div>
      </div>
    </Container>
  );
}

UserProfile.displayName = "UserProfile";