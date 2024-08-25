// @_learnable
const avatarStyles: string[] = [
  'adventurer',
  'adventurer-neutral',
  'avataaars',
  'avataaars-neutral',
  'big-ears',
  'big-ears-neutral',
  'big-smile',
  'bottts',
  'bottts-neutral',
  'croodles',
  'croodles-neutral',
  'fun-emoji',
  'icons',
  'identicon',
  'initials',
  'lorelei',
  'lorelei-neutral',
  'micah',
  'miniavs',
  'open-peeps',
  'personas',
  'pixel-art',
  'pixel-art-neutral',
  'shapes',
  'thumbs',
];

//generates random avatar style from array above
const getRandomAvatarStyle = (): string => {
  const random = Math.floor(Math.random() * avatarStyles.length);
  return avatarStyles[random];
};

//combines email and seed variable to generate truly random and unique avatar url
function generateRandomAvatar(email: string): string {
  const _email = email.trim();

  const entropySource = (): string => Math.random().toString(36).substring(2, 7);

  const replaceAt = `-${entropySource()}-`;
  const replaceDot = `-${entropySource()}-`;

  const seed = _email.replace('@', replaceAt).replace(/\./g, replaceDot);

  const randomAvatarStyle = getRandomAvatarStyle();

  const avatarUrl = `https://api.dicebear.com/5.x/${randomAvatarStyle}/svg?seed=${seed}&size=200&radius=50`;

  return avatarUrl;
}

export { generateRandomAvatar };
