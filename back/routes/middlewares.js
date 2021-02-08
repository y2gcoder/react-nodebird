exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next(); //여기 안에 뭐라도 넣으면 error처리하러 감. 그냥 빈값으로 두면 다음 미들웨어로 감. 
  } else {
    res.status(401).send('로그인이 필요합니다.');
  }
}

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next(); //여기 안에 뭐라도 넣으면 error처리하러 감. 그냥 빈값으로 두면 다음 미들웨어로 감. 
  } else {
    res.status(401).send('로그인하지 않은 사용자만 접근 가능합니다.');
  }
}