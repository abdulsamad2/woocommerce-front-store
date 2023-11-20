import { redirect } from "next/navigation";
import { options } from "../../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import AccountCard from "@/components/ui/accountCard";
import { ShoppingBag } from "lucide-react";
const accountData = [
  {
    title: "Orders",
    description: "View your orders",
    url: "/orders",
    icon: <ShoppingBag size={40} className="text-indigo-500" />,
  },
  {
    title: "Address",
    description: "View your shipping Address",
    url: "/",
    icon: <ShoppingBag size={40} className="text-indigo-500" />,
  },
  {
    title: "Account Details",
    description: "View your account details",
    url: "/",
    icon: <ShoppingBag size={40} className="text-indigo-500" />,
  },
];
async function MyAccountPage({}: any) {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/login");
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Hello
            {
              // @ts-ignore
              session?.user.user_display_name
            }
            welcome to your account
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
            gentrify, subway tile poke farm-to-table. Franzen you probably
            havent heard of them man bun deep jianbing selfies heirloom prism
            food truck ugh squid celiac humblebrag.
          </p>
        </div>
        <div className="flex flex-wrap -m-4 text-center">
          {accountData.map((item: any) => (
            <AccountCard
              key={item.title}
              title={item.title}
              description={item.description}
              url={item.url}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default MyAccountPage;
