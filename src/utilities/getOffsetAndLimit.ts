type OffsetAndLimit = {
   offset: number;
   limit: number;
} 

export const getOffsetAndLimit = (page: number, limit: number, count: number): OffsetAndLimit => {
   const rest = count - ((page - 1) * limit);
   const _limit = rest < limit ? rest : limit;
   return page <= 1
      ? { offset: 0, limit: _limit }
      : { offset: (page - 1) * limit, limit: _limit };
};
