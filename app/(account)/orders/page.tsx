import getOrder from "@/actions/getOrder";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, Trash, ViewIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
const Orderpage = async () => {
  const session = await getServerSession(options);
  //@ts-ignore
  const email = session?.user?.user_email;

  const order = await getOrder(email);
  // const date = new Date().toLocaleDateString("en-us", {
  //   weekday: "long",
  //   year: "numeric",
  //   month: "short",
  //   day: "numeric",
  // });
  // "Friday, Jul 2, 2021"
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
            Orders
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            {order.length > 0
              ? "View your order history"
              : "No order history yet."}
          </p>
        </div>
        <div className="lg:w-2/3 w-full mx-auto overflow-auto">
          {order.length > 0 && (
            <table className="table-auto w-full text-left whitespace-no-wrap">
              <thead>
                <tr>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                    Order #
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Date
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Status
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Total
                  </th>
                  <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {order.map((item: any) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3">{item.id}</td>
                    <td className="px-4 py-3">
                      {new Date(item.date_created).toLocaleString("en-US", {
                        hour12: false,
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">{item.status}</td>
                    <td className="px-4 py-3 text-lg text-gray-900">
                      {item.total} Rs
                    </td>
                    <td className="w-10  text-center">
                      <Button className=" ">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
          <Link
            href="/my-account"
            className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
          >
            <ArrowBigLeft />
            Back to my Account
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Orderpage;
