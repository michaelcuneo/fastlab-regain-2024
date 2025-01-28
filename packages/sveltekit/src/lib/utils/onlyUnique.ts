export const onlyUnique = (value: Exercise, index: number, self: Exercise[]) => {
	return self.findIndex((v) => v.id === value.id) === index;
};
