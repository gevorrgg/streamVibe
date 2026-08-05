import type { ApiProfile, ApiStats } from "../streamvibe/profile/types/profile.types";
import { humanReadable, initialsOf } from "../streamvibe/profile/utils/format";
import type { ReactNode } from "react";


type ProfileSidebarProps = {
    profile: ApiProfile | null;
    stats: ApiStats;
    avatarGrad: string;
    /** Action button in the profile card: "Edit Profile" on your own page, Subscribe on someone else's */
    actionButton: ReactNode;
    /** Show the full navigation menu on your own page, or hide it on someone else's */
    showNav?: boolean;
};

const NAV_ITEMS: { icon: string; label: string; active?: boolean }[] = [
    { icon: "🎬", label: "My Videos", active: true },
    { icon: "📊", label: "Analytics" },
    { icon: "💬", label: "Comments" },
    { icon: "❤️", label: "Liked" },
    { icon: "🔖", label: "Saved" },
    { icon: "⚙️", label: "Settings" },
];

export function ProfileSidebar({ profile, stats, avatarGrad, actionButton, showNav = true }: ProfileSidebarProps) {
    const displayName = profile?.name || profile?.username || "";

    return (
        <aside id="sidebar">
            <div className="profile-card">
                <div className="avatar-wrap">
                    <div className="avatar" style={profile?.avatarUrl ? { background: "none" } : { background: avatarGrad }}>
                        {profile?.avatarUrl ? <img src={profile.avatarUrl} alt="" /> : initialsOf(displayName)}
                    </div>
                    <span className="online-dot" />
                </div>
                <div className="profile-name">{displayName}</div>
                <div className="profile-handle">@{profile?.username} · Creator</div>
                {profile?.bio && <div className="profile-bio-display">{profile.bio}</div>}
                <div className="profile-meta-row">
                    {profile?.location && <span className="meta-item">{profile?.location}</span>}
                    {profile?.website && (
                        <span className="meta-item">
                            <a
                                href={/^https?:\/\//.test(profile.website) ? profile.website : `https://${profile.website}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                🔗 {profile.website.replace(/^https?:\/\//, "")}
                            </a>
                        </span>
                    )}
                </div>
                <div className="profile-stats">
                    <div className="stat">
                        <div className="stat-num">{humanReadable(stats.videosCount)}</div>
                        <div className="stat-label">Videos</div>
                    </div>
                    <div className="stat">
                        <div className="stat-num">{humanReadable(stats.followersCount)}</div>
                        <div className="stat-label">Followers</div>
                    </div>
                    <div className="stat">
                        <div className="stat-num">{humanReadable(stats.totalViews)}</div>
                        <div className="stat-label">Views</div>
                    </div>
                </div>
                <div className="profile-action-slot">{actionButton}</div>
            </div>
            {showNav && (
                <nav className="nav-section">
                    <div className="nav-label">Menu</div>
                    {NAV_ITEMS.map((item) => (
                        <div key={item.label} className={`nav-item${item.active ? " active" : ""}`}>
                            <span className="nav-icon">{item.icon}</span> {item.label}
                        </div>
                    ))}
                </nav>
            )}
        </aside>
    );
}