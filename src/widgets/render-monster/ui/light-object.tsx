const LightObject = () => {
  return (
    <>
      <ambientLight intensity={5} />
      <spotLight position={[10, 15, 10]} angle={0.55} penumbra={0.8} />
    </>
  );
};

export default LightObject;
