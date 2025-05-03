
const Title = ({text, className}: {text: string,className?: string}, ) => {
  return (
      <h2 className={`${className}  pb-3 text-xl font-semibold`}>{text}</h2>
  );
};

export default Title;