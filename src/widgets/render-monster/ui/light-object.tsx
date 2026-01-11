const LightObject = () => {
  return (
    <>
      <ambientLight intensity={3.5} />

      <directionalLight position={[6, 10, 7]} intensity={1.5} />
      <directionalLight position={[-6, 12, -5]} intensity={3} />
    </>
  );
};

export default LightObject;
