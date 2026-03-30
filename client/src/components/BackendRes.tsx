type PropError = {
    message: string;
}

function BackendRes({message}: PropError) {
  return (
    <div>
      <h2 className="text-red-500">{message}</h2>
    </div>
  )
}

export default BackendRes
