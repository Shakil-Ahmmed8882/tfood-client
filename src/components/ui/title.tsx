
const Title = ({text, className}: {text: string,className?: string}, ) => {
  return (
      <h2 className={`${className}   text-xl font-semibold`}>{text}</h2>
  );
};

export default Title;