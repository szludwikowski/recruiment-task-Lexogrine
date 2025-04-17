import Container from "@components/layout/Container";

// import Form from "./Form";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.left}>
            <div className={styles.logo}>Startup 3</div>
            <h1 className={styles.title}>
              Generate <br /> Awesome Web Pages
            </h1>
            <p className={styles.description}>
              The most important part of the Startup is the samples. The samples
              form a set of 25 usable pages you can use as is or you can add new
              blocks.
            </p>
            <button className={styles.learnMore}>Learn More</button>
          </div>
          <div className={styles.right}>{/* <Form /> */}</div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
