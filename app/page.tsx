import DashboardOverview from "@/components/DashboardOverview";
import QuickAction from "@/components/QuickAction";
import RecentQRScan from "@/components/RecentQRScan";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main className="p-6 md:p-8">
        <DashboardOverview />
        <QuickAction />
        <RecentQRScan />
      </main>
    </div>
  );
}
