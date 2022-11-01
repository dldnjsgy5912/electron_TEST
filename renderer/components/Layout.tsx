import Nav from "./Nav";

const Layout = ({ children }) => {
  return (
    <>
      <nav>
        <Nav />
      </nav>
      <main>{children}</main>
    </>
  );
};

export default Layout;
