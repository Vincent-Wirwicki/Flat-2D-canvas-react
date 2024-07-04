import Constellation from "../components/constellation/Constellation";

const ConstellationPage = () => {
  return (
    <section
      style={{
        width: "70%",
        height: "60%",
        border: "solid 1px #fff",
        boxSizing: "content-box",
      }}
    >
      <Constellation />
    </section>
  );
};

export default ConstellationPage;
