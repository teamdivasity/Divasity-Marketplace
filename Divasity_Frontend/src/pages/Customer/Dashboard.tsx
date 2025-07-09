import { Link } from "react-router-dom";
import { TabHeader } from "../../components/Header/TabHeader";
import {
  Bell,
  Bitcoin,
  ChevronRight,
  FolderOpen,
  TrendingUp,
} from "lucide-react";

export function Dashboard() {
  const stats = [
    {
      icon: <Bitcoin size={30} />,
      amount: "Ξ 4,500",
      label: "Total Raised",
    },
    // {
    //   icon: <TrendingUp size={30} />,
    //   amount: '7',
    //   label: 'Investor Interest',
    // },
    {
      icon: <FolderOpen size={30} />,
      amount: "3",
      label: "Live Projects",
    },
  ];

  return (
    <div>
      <TabHeader
        name="Dashboard"
        containerStyle="flex-row-reverse bg-white"
        icon={<Bell />}
      />
      <div className="bg-white pt-29 px-5">
        <div>
          <h2 className="font-poppins text-[22px] font-medium">
            Welcome back, Engr 👋
          </h2>
          <div className="grid grid-cols-2 gap-1 py-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-purple-100 px-4 py-4 rounded-[5px]"
              >
                <div className="bg-neutral-100 rounded-full w-fit p-2 mb-2">
                  {stat.icon}
                </div>
                <p className="font-poppins text-[20px] font-medium py-2">
                  {stat.amount}
                </p>
                <p className="text-[20px] font-medium font-opensans">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <div className="py-4">
            <Link to="/projects" className="flex justify-between items-center">
              <span className="font-poppins text-[22px] font-medium">
                Your Projects
              </span>
              <ChevronRight />
            </Link>
            <div className="bg-purple-100">
              <div>
                <img src="" alt="Project Image"/>
                <div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
