import { ShoppingBag } from "lucide-react";
import Link from "next/link";

interface AccountCardProps {
  title: string;
  description: string;
  url: string;
  icon: any;
}

const AccountCard: React.FC<AccountCardProps> = ({
  title,
  description,
  url,
  icon,
}) => {
  return (
    <Link href={url} className="p-4 md:w-1/3 sm:w-1/2 w-full">
      <div className="border-2 space-y-2 border-gray-200 px-4 py-6 rounded-lg">
        <div className="mx-auto inline-block">{icon}</div>
        <h2 className="title-font font-medium text-3xl text-gray-900">
          {title}
        </h2>
        <p className="leading-relaxed">{description}</p>
      </div>
    </Link>
  );
};

export default AccountCard;
