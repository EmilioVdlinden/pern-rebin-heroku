
const PASSWORD_RESET_HTML_EN = (link) => {
 return   `<p>Hello,<br><br>
          A password reset has been requested for your Rebin account.
          To complete the reset, please click this <a href="${link}">link</a>.<br><br>
          If you did not request a password reset, you can safely ignore this email.<br><br>
          Many thanks,
          <br>
          <div>Rebin</div>`;
}

const PASSWORD_RESET_TEXT_EN = (link) => {
  return `Hello ,

        A password reset has been requested for your Rebin account.
        To complete the reset, please click this link: ${link}.
        
        If you did not request a password reset, you can safely ignore this email.
        
        Many thanks,
        The Repoint team`;
}
 

module.exports = {PASSWORD_RESET_HTML_EN, PASSWORD_RESET_TEXT_EN};
  