import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const Users = () => {
  return (
    <div>
      <Breadcrumb
        separator=">"
        items={[
          {
            title: <Link to="/">Dashboard</Link>,
          },
          {
            title: <Link to="/users">Users</Link>,
          },
        ]}
      />
    </div>
  );
};

export default Users;
