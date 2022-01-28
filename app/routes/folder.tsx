import { Outlet } from "remix";

// this is a layout component
export default function Parent() {
  return (
    <div className="p-10">
      <Outlet />
    </div>
  );
}
