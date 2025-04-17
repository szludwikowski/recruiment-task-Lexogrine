import Button from "@components/ui/Button";

import styles from "./SignUpForm.module.scss";

const SignUpForm = () => {
  return (
    <form className={styles.form}>
      <h2 className={styles.heading}>Sign Up Now</h2>

      <input type="email" placeholder="Your email" className={styles.input} />
      <input
        type="password"
        placeholder="Your password"
        className={styles.input}
      />

      <label className={styles.checkboxWrapper}>
        <input type="checkbox" className={styles.checkbox} />
        <span>I agree to the Terms of Service.</span>
      </label>

      <Button type="submit" variant="secondary">
        Sign Up
      </Button>

      <div className={styles.divider}>or</div>

      <Button type="button" variant="social">
        Login via Twitter
      </Button>

      <p className={styles.loginText}>
        Do you have an Account? <a href="#">Sign In</a>
      </p>
    </form>
  );
};

export default SignUpForm;
