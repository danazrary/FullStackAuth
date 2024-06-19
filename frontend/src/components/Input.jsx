export default function Input(
  { name, title, placeholder, type, inputClass, labelClass ,...props}
  
) {
  return (
    <>
      <label className={`label ${labelClass}`} htmlFor={name}>
        {title}
      </label>
      <input
        className={`input ${inputClass}`}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        {...props}
      />
    </>
  );
}
