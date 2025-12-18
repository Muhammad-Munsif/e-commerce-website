import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Breadcrumb = ({ items }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-4">
      <div className="container-custom">
        <nav className="flex items-center text-sm">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
              )}
              <Link
                to={item.path}
                className={`${
                  index === items.length - 1
                    ? "text-gray-900 dark:text-white font-medium"
                    : "text-gray-600 dark:text-gray-400 hover:text-gold transition-colors"
                }`}
              >
                {item.label}
              </Link>
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;
