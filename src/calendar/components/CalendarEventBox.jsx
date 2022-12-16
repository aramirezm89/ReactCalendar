
//este componente sera la caja de contenido con la descripcion del evento, nombre usuario etc.
export const CalendarEventBox = ({event}) => {
   const {title,user} = event;
  return (
    <>
      <strong className="text-center">{title}</strong>
      <span className="text-center"> - {user.name}</span>
    </>
  );
}
