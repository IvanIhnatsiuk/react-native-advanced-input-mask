import { useState } from 'react';

let count = 0;

const useId = () => {
  const [id] = useState(() => `tailPlaceholder-${count++}`);

  return id;
};

export default useId;
