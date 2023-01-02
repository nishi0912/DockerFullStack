import { useState } from "react";
import { RiStickyNoteFill } from "react-icons/ri";
import { signIn, signOut, useSession } from "next-auth/react";
import { Typography, Row, Col, Image } from "antd";
import Link from "next/link";
import styles from "../../styles/Navbar.module.css";

const NavBar = () => {
  const [pageColor, setPageColor] = useState(null);
  const { data: session, status: userStatus } = useSession();

  console.log({ session, userStatus });

  const PagesHandler = (page) => {
    setPageColor(page);
  };

  return (
    <div className={styles.navbarScreen}>
      <Row align="middle" justify="space-between">
        <Col>
          <Typography className={[styles.headerTitle, styles.flexbox]}>
            <RiStickyNoteFill className={styles.notesIcon} />
            &nbsp;Cap-Blog
          </Typography>
        </Col>
        <Col>
          <Row gutter={[20, 0]} justify="space-between">
            <Col onClick={() => PagesHandler("Home")}>
              <Link href="/">
                <a>
                  <Typography
                    className={
                      pageColor === "Home"
                        ? [styles.headerMenus, styles.headerMenusColor]
                        : styles.headerMenus
                    }
                  >
                    Home
                  </Typography>
                </a>
              </Link>
            </Col>
            <Col onClick={() => PagesHandler("About-Us")}>
              <Link href="/about-us">
                <a>
                  <Typography
                    className={
                      pageColor === "About-Us"
                        ? [styles.headerMenus, styles.headerMenusColor]
                        : styles.headerMenus
                    }
                  >
                    About Us
                  </Typography>
                </a>
              </Link>
            </Col>
            <Col onClick={() => PagesHandler("Contact-Us")}>
              <Link href="/contact-us">
                <a>
                  <Typography
                    className={
                      pageColor === "Contact-Us"
                        ? [styles.headerMenus, styles.headerMenusColor]
                        : styles.headerMenus
                    }
                  >
                    Contact Us
                  </Typography>
                </a>
              </Link>
            </Col>
            <Col onClick={() => PagesHandler("Compose")}>
              <Link href="/compose">
                <a>
                  <Typography
                    className={
                      pageColor === "Compose"
                        ? [styles.headerMenus, styles.headerMenusColor]
                        : styles.headerMenus
                    }
                  >
                    Compose
                  </Typography>
                </a>
              </Link>
            </Col>
            <Col onClick={() => PagesHandler("Quotes")}>
              <Link href="/quotes">
                <a>
                  <Typography
                    className={
                      pageColor === "Quotes"
                        ? [styles.headerMenus, styles.headerMenusColor]
                        : styles.headerMenus
                    }
                  >
                    Quotes
                  </Typography>
                </a>
              </Link>
            </Col>
            {!(userStatus === "authenticated") ? (
              <Col onClick={() => PagesHandler("Logout")} f>
                <Link href="/api/auth/signin">
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      signIn("facebook");
                    }}
                  >
                    <Typography
                      className={
                        pageColor === "Sign In"
                          ? [styles.headerMenus, styles.headerMenusColor]
                          : styles.headerMenus
                      }
                    >
                      Sign In
                    </Typography>
                  </a>
                </Link>
              </Col>
            ) : (
              <Col onClick={() => PagesHandler("Logout")}>
                <Row align="middle">
                  <Col>
                    <Typography className={styles.headerMenus}>
                      {session?.user?.name}
                    </Typography>
                    <Image
                      width={30}
                      height={30}
                      src={session?.user?.image}
                      alt=""
                    />
                  </Col>
                  <Col>
                    <Link href="/api/auth/signout">
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          signOut();
                        }}
                      >
                        <Typography
                          className={
                            pageColor === "Logout"
                              ? [styles.headerMenus, styles.headerMenusColor]
                              : styles.headerMenus
                          }
                        >
                          Log out
                        </Typography>
                      </a>
                    </Link>
                  </Col>
                </Row>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default NavBar;
