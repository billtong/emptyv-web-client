export const handleCommentList = (commentList) => {
	const repliesList = commentList.filter(item => !item.deleted && item.parentId !== null);
	
	const resultList = commentList.map(item => {
		if (!item.deleted && !item.parentId) {
			const replies = repliesList.filter(reply => reply.parentId === item.id);
			item.replies = replies;
			return item;
		}
	});
	return resultList.filter(item => item);
};
