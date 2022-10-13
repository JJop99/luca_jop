import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.sass";
import ScrollToTop from "../UI/ScrollToTop";

function Layout(props) {
  return (
    <div>
      <MainNavigation style="position: relative; z-index: 1" />
      <main className={classes.main}>
        {props.children}
        <ScrollToTop />
      </main>
    </div>
  );
}

export default Layout;
