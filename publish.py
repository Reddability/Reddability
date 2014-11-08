import subprocess
import collections
import zipfile
import sys
import scss
import os
import shutil


class Publish:

    PUBLISH_FOLDER = 'publish/'
    TEMPORARY_FOLDER = 'tmp/'

    def __init__(self, args):
        '''
        Args contain the compile options in the order:
        [scss-file, css-file, boolean, scss-file, css-file, boolean, ...]
        '''
        self.ownFileName = args.pop(0)
        argsLength = len(args)

        if(argsLength == 0):
            args = ['scss/subreddit.scss', 'subreddit.css', 'false', 'scss/main.scss', 'main.css', 'true']
            print 'No arguments given, using default values.'
            argsLength = len(args)
        elif(argsLength % 3 != 0):
            raise Exception('You need to give arguments in a combination of 3.')

        # If the publishing folder doesn't exist, create it
        Publish.createFolder(self.PUBLISH_FOLDER)

        # SCSS Compile options
        _scss = scss.Scss(
            scss_opts={
                'compress': True
            })

        for a in xrange(0, argsLength, 3):
            scssFile = args[a]
            if not FileManager.isExtension(scssFile, 'scss'):
                raise Exception('Source files need to be scss files.')

            cssFile = args[a + 1]
            if not FileManager.isExtension(cssFile, 'css'):
                raise Exception('Destination files need to be css files.')
            compiledCss = _scss.compile(scss_file=scssFile)

            compileOthers = args[a + 2] in ['true', 'True', 'y', 'yes']

            if compileOthers:
                zipContent = FileManager.sortFiles(self.getFiles(), ['scss'], False)
                tmpCss = self.TEMPORARY_FOLDER + cssFile
                Publish.createFolder(self.TEMPORARY_FOLDER)
                Publish.saveString(compiledCss, tmpCss)

                zipContent.append([tmpCss, 'css/' + cssFile])

                dest = self.PUBLISH_FOLDER + FileManager.splitFile(cssFile)[0] + '.zip'
                zipFile = zipfile.ZipFile(dest, mode='w')
                try:
                    for contentFile in zipContent:
                        if isinstance(contentFile, list):
                            zipFile.write(contentFile[0], arcname=contentFile[1])
                        else:
                            zipFile.write(contentFile)
                finally:
                    print 'Done adding files, closing.'
                    zipFile.close()

                shutil.rmtree(self.TEMPORARY_FOLDER)

            else:
                destination = self.PUBLISH_FOLDER + cssFile
                print 'Saving CSS file to ' + self.PUBLISH_FOLDER + cssFile
                Publish.saveString(compiledCss, destination)

    @staticmethod
    def saveString(string, dest):
        f = open(dest, 'w')
        f.write(string)
        f.close()

    @staticmethod
    def createFolder(folder):
        if not os.path.exists(folder):
            print 'Folder "' + folder + '" does not exist, creating it.'
            os.makedirs(folder)

    def getFiles(self):
        process = subprocess.Popen('git ls-tree --name-only -r HEAD', stdout=subprocess.PIPE, shell=True)
        (output, error,) = process.communicate()
        output = output.strip().split('\n')
        output = output.remove(self.ownFileName) if self.ownFileName in output else output

        return output if error is None else None

    def getCompileFiles(self):
        pass


class FileManager:

    @staticmethod
    def isExtension(fullName, extension):
        return FileManager.splitFile(fullName)[1] == extension

    @staticmethod
    def splitFile(f):
        parts = f.split('.')
        extension = parts.pop() if len(parts) > 1 else ''
        return (''.join(parts), extension,)

    @staticmethod
    def sortFiles(files, ignoredFolders=None, returnDict=True, returnIgnored=False):
        '''
        It converts a list of files to a list a dictionaries where the key is the folder and the value is either another dict or a string with the name of the file.
        '''
        result = {}
        new = []
        ignored = []
        ignoredFolders = [] if ignoredFolders is None else ignoredFolders
        for f in files:
            path = f.split('/')

            ignore = False
            for ignoredFolder in ignoredFolders:
                if ignoredFolder == path[0]:
                    ignore = True
                    break
            if ignore:
                if returnIgnored:
                    ignored.append(f)
                continue

            if returnDict:
                sortedPath = FileManager.sortPath(path)
                result = FileManager.updateDict(result, sortedPath)
            else:
                new.append(f)

        if returnDict:
            return result
        else:
            if returnIgnored:
                return {'new': new, 'ignored': ignored}
            else:
                return new

    @staticmethod
    def sortPath(path, current=None):
        '''
        Sorts a list path into a dict
        '''
        current = {} if current is None else current
        if len(path) == 1:
            (name, extension,) = FileManager.splitFile(path[0])
            current[name] = extension
        else:
            folder = path.pop(0)
            current[folder] = {}
            current[folder] = FileManager.sortPath(path, {})
        return current

    @staticmethod
    def updateDict(original, addition):
        for k, v in addition.iteritems():
            if isinstance(v, collections.Mapping):
                r = FileManager.updateDict(original.get(k, {}), v)
                original[k] = r
            else:
                original[k] = addition[k]
        return original


def main():
    try:
        Publish(sys.argv)
    except Exception as e:
        print e

if __name__ == '__main__':
    main()
